/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash b2f849988f18c645ab6b3b87942fb803 */

import { ConcreteRequest } from "relay-runtime";
export type AddClubSlugAliasMutationVariables = {
    id: string;
    slug: string;
};
export type AddClubSlugAliasMutationResponse = {
    readonly addClubSlugAlias: {
        readonly club: {
            readonly id: string;
            readonly slug: string;
            readonly slugAliases: ReadonlyArray<{
                readonly slug: string;
            }>;
        } | null;
    } | null;
};
export type AddClubSlugAliasMutation = {
    readonly response: AddClubSlugAliasMutationResponse;
    readonly variables: AddClubSlugAliasMutationVariables;
};



/*
mutation AddClubSlugAliasMutation(
  $id: ID!
  $slug: String!
) {
  addClubSlugAlias(input: {id: $id, slug: $slug}) {
    club {
      id
      slug
      slugAliases {
        slug
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "id"
          },
          {
            "kind": "Variable",
            "name": "slug",
            "variableName": "slug"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "AddClubSlugAliasPayload",
    "kind": "LinkedField",
    "name": "addClubSlugAlias",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ClubSlugAlias",
            "kind": "LinkedField",
            "name": "slugAliases",
            "plural": true,
            "selections": [
              (v1/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AddClubSlugAliasMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddClubSlugAliasMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "b2f849988f18c645ab6b3b87942fb803",
    "metadata": {},
    "name": "AddClubSlugAliasMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = '6468e8612a435e73391ff3055452e250';
export default node;
