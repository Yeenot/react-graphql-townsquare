import { useCallback, useEffect, useState } from 'react';

import { useMutation, useQuery } from '@apollo/client';

// MUI components
import { Box, Snackbar } from '@mui/material';

// Custom components
import DraggableList from '../components/DraggableList/DraggableList';
import PostCard from '../components/PostCard/PostCard';

// Custom hooks
import useInfiniteScroll from '../hooks/InfiniteScroll';

// Queries and mutations
import { GET_POSTS } from '../queries/posts/get-posts';
import { UPDATE_POST_ORDER } from '../queries/posts/update-post-order';
import { POST_ORDER_SUBSCRIPTION } from '../queries/posts/post-order-subscription';

// Entites
import { IPost, IPostResponse } from '../entities/Post';

const HomePage: React.FC = () => {
  const [updatePostOrderPosition, { error: updatePostOrderError }] = useMutation(UPDATE_POST_ORDER); 
  const { loading, error, data, fetchMore, subscribeToMore } = useQuery<IPostResponse>(GET_POSTS, {
    variables: { offset: 0, limit: 40 }, // Set pagination
    notifyOnNetworkStatusChange: true,
  }); 

  const [posts, setPosts] = useState<IPost[]>(data?.posts ?? []);
  const [snackbarState, setSnackbarState] = useState<{ message: string; open: boolean }>({ message: "Something went wrong.", open: false });

  const showSnackbar = () => {
    setSnackbarState((state) => ({ ...state, open: true }))
  };

  const hideSnackbar = () => {
    setSnackbarState((state) => ({ ...state, open: false }))
  };

  // This function will handle the loading more of posts.
  const onLoadMore = useCallback(() => {
    return fetchMore({
        variables: {
        offset: posts.length // Set the current nubmer of posts as the offset
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        // If there are no more posts, just return the previous posts.
        if (!fetchMoreResult) return previousResult;

        // Otherweise, merge the new posts with the previous posts.
        return {
          ...previousResult,
          posts: [...previousResult.posts, ...fetchMoreResult.posts],
        };
      },
    })
  }, [fetchMore, posts.length]);

  // 
  /**
   * This function will handle the re-fetching of current number of posts. This is when there are updates on the
   * order position of the posts. So, we need to update the current number of posts displayed since that some of them
   * might not be visible anymore because it was moved outside the number of posts displayed.
   */
  const reFetch = useCallback((limit: number) => {
    return fetchMore({
        variables: {
        offset: 0, // Always set offset as 0
        limit // Use the current number of posts
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;

        return {
          ...previousResult,
          posts: [ ...fetchMoreResult.posts ],
        };
      },
    })
  }, [fetchMore]);

  /**
   * If the draggable list component informs the home page that an item has been moved, then we need to persist it in the database and
   * update the order in their and also at the same time we need to update the order position of the posts in here to avoid overrideing
   * the posts inside the draggable list.
   */
  const onDraggableListItemMoved = useCallback((item: IPost, sourceIndex: number, destinationIndex: number): void => {
    // Save new order position of the moved post
    updatePostOrderPosition({
      variables: {
        id: item.id,
        newPositionIndex: destinationIndex + 1
      }
    }).then(() => {
      // After saving, update the order of the posts in here.
      const newPosts = [...posts];
      const draggedItem = newPosts[sourceIndex];
      newPosts.splice(sourceIndex, 1);
      newPosts.splice(destinationIndex, 0, draggedItem);
      setPosts(newPosts)
    }).catch(() => {
      showSnackbar();
    });

  }, [updatePostOrderPosition, posts])

  useEffect(() => {
    if (!!error || !!updatePostOrderError) {
      showSnackbar();
    }
  }, [error, updatePostOrderError])

  /**
   * The hook will listen or subscribe if there are any changes in the order position of the posts. If there is,
   * it will trigger the re-fetching of the current number of posts to update the displayed posts.
   */
  useEffect(() => {
    subscribeToMore({
      document: POST_ORDER_SUBSCRIPTION,
      updateQuery: (previousResult, { subscriptionData }) => {
        if (!subscriptionData) return previousResult;

        reFetch(previousResult.posts.length);
        return previousResult;
      },
    })
  }, [subscribeToMore, reFetch]);

  // Use custom infinite scroll hook, if the user reaches the bottom it will execute the loading more of posts.
  useInfiniteScroll(async () => {
    if(!loading) {
      await onLoadMore();
    }
  }, [onLoadMore]);

  useEffect(() => {
    if (!!data?.posts) {
      setPosts([...data.posts]);
    }
  }, [data]);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={4000}
        onClose={hideSnackbar}
        open={snackbarState.open}
        message={snackbarState.message}
      />
      <Box sx={{ textAlign: 'center', paddingBottom: '20px' }}>
        <h1>Posts</h1>
        <DraggableList<IPost>
          id="draggable-list-posts"
          items={posts}
          onItemMoved={onDraggableListItemMoved}
          loading={loading}
          onLoadMore={onLoadMore}
          sx={{ width: '70%', margin: '0 auto' }}
        >
            {(item, index) => (
              <PostCard
                title={item.title}
                user={item.user}
                category={item.category}
                date={item.created_at}
              >
              </PostCard>
            )}
        </DraggableList>
      </Box>
    </>
  );
};

export default HomePage;
