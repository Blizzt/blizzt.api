// Dependencies
import {gql} from 'apollo-server-express';

export default gql`
  enum ActionStateType {
    active
    inactive
  }
  
  type Action {
    state: ActionStateType
    type: TransferType
    message: String
    signature: String
    createdAt: Date
  }
`;
