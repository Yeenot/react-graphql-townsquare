import { ReactElement } from 'react';

import { Box, Card, Chip, CardContent, Typography } from '@mui/material';
import  { CardOwnProps } from '@mui/material/Card';

import { IUser } from '../../entities/User';
import { ICategory } from '../../entities/Category';

import moment from 'moment';

// Post card interface
export interface IPostCard extends CardOwnProps {
  title: string;
  date: string;
  user: IUser,
  category: ICategory
}

// This is a custom post card component that displays post's data/information.
const PostCard = ({ title, user, category, date,  ...rest }: IPostCard): ReactElement => {
  // Format date since date is a timestamp
  const formattedDate = !!date ? moment(parseInt(date)).format('MMMM DD , YYYY') : null;
  
  return (
    <Card sx={{ width: '100%' }} {...rest}>
      <CardContent sx={{padding: '10px 16px !important'}}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: "space-between",
            marginBottom: "10px"
          }
        }>
          {/* User or author */}
          <Typography
            component="span"
            sx={{ fontSize: '12px' }}
          >
            {user.first_name} {user.last_name}
          </Typography>

          {/* Category */}
          <Chip label={category.name} size="small" />
        </Box>

        {/* Post's title */}
        <Typography
          variant="h6"
          sx={{ fontSize: '17px', fontWeight: 'bold', lineHeight: 1.2 }}
        >
          {title}
        </Typography>

        {/* Post's date created */}
        {!!formattedDate ? <Typography
          component="div"
          sx={{
            fontSize: '11px',
            marginTop: '10px'
          }}
          align='right'
        >
          {formattedDate}
        </Typography> : null}
      </CardContent>
    </Card> 
  );
};

export default PostCard;

