import { ReactElement, ReactNode, useCallback, useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { Box, CircularProgress, List, ListItem, Typography } from '@mui/material';
import { SxProps, styled } from '@mui/material/styles';

// Draggable list item interface
export type IDraggableListItem<T> = T & {
  id: number | string;
};

// Draggable list item moved interface
export interface IDraggableListItemMoved<T> {
  item: T;
  sourceIndex: number;
  destinationIndex: number;
}

// Draggable list interface
export interface IDraggableList<T> {
  id: string;

  children: (item: IDraggableListItem<T>, index: number) => ReactNode;
  items: IDraggableListItem<T>[];

  onItemMoved?: (
    item: T, 
    sourceIndex: number, 
    destinationIndex: number
  ) => void;

  loading?: boolean;
  onLoadMore?: () => Promise<any>;

  sx?: SxProps;
}

// Styled component for MUI List component
const StyledList = styled(List)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  padding: 0
}));

// Styled component for MUI List Item component
const StyledListItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-child': {
    borderBottom: 'none',
  },
  cursor: 'pointer',
  userSelect: 'none',
  padding: 0,
}));

/**
 * This is a custom draggable list component that allows the user to drag and drop items from
 * the list. This component also supports infinite scrolling.
 */
const DraggableList = <T,>({ id, children, items, loading, onLoadMore, onItemMoved, ...rest }: IDraggableList<T>): ReactElement => {
  const [_items, setItems] = useState(items);

  /**
   * If the user has dragged and dropped a list item, we need to update the order of the list
   * by finding that item and manually moving it to the new position. This is to prevent reverting
   * back the posts to the order position.
   * 
   * Then we need to inform the caller that the item has been moved.
   */
  const onDragEnd = useCallback((result: DropResult) => {
    // If there is no destination, the stop immediately.
    if (!result?.destination) {
      return;
    }

    // Get source and destination indexes
    const sourceIndex = result.source.index;
    const destinationIndex = result?.destination?.index;

    // Move the dragged item to the new position
    const newItems = [..._items];
    const draggedItem = newItems[sourceIndex];
    newItems.splice(sourceIndex, 1);
    newItems.splice(destinationIndex, 0, draggedItem);
    setItems(newItems)

    // Inform the caller that an item has been dragged.
    if(!!onItemMoved) {
      onItemMoved(draggedItem, sourceIndex, destinationIndex);
    }

  }, [_items, onItemMoved]);

  useEffect(() => {
    setItems([...items])
  }, [items])
  
  // If there are no items in the list then just display 'empty'
  if ((!_items || _items.length === 0) && !loading) {
    return (
      <Box sx={{ textAlign: 'center' }}>
        <Typography component="div">No data</Typography>
      </Box>
    );
  }
  
  return (
    <Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={id}>
          {(provided) => (
            <StyledList ref={provided.innerRef} {...provided.droppableProps} {...rest}>
              {_items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                  {(provided) => (
                    <StyledListItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {children(item, index)}
                    </StyledListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </StyledList>
          )}
        </Droppable>
      </DragDropContext>

      {/* Infinite scrolling loading icon */}
      {loading ? <CircularProgress size={40} sx={{ marginTop: '20px', marginBottom: '20px' }} /> : null}
    </Box>
  );
};

export default DraggableList;