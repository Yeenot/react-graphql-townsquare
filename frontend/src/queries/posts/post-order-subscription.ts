import { gql } from "@apollo/client";

export const POST_ORDER_SUBSCRIPTION = gql`
  subscription OnPostOrderUpdate {
    newPostOrder {
      id
      title
      order
    }
  }
`;
