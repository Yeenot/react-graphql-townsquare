import { gql } from "@apollo/client";

export const UPDATE_POST_ORDER = gql`
  mutation UpdatePostOrder($id: Int!, $newPositionIndex: Int!) {
    updatePostOrder(id: $id, newPositionIndex: $newPositionIndex) {
      id
      title
      order
    }
  }
`;
