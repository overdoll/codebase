/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash f5f6fbb4de171a235ace1b54222505ca */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CurationProfileSetupQueryVariables = {};
export type CurationProfileSetupQueryResponse = {
    readonly viewer: {
        readonly curationProfile: {
            readonly completed: boolean;
            readonly " $fragmentRefs": FragmentRefs<"DateOfBirthCurationStepFragment" | "AudiencesCurationStepFragment" | "CategoriesCurationStepFragment" | "CurationStepperFooterFragment">;
        };
    } | null;
};
export type CurationProfileSetupQuery = {
    readonly response: CurationProfileSetupQueryResponse;
    readonly variables: CurationProfileSetupQueryVariables;
};



/*
query CurationProfileSetupQuery {
  viewer {
    curationProfile {
      completed
      ...DateOfBirthCurationStepFragment
      ...AudiencesCurationStepFragment
      ...CategoriesCurationStepFragment
      ...CurationStepperFooterFragment
      id
    }
    id
  }
}

fragment AudiencesCurationStepFragment on CurationProfile {
  audience {
    audiences {
      id
      title
    }
  }
}

fragment CategoriesCurationStepFragment on CurationProfile {
  category {
    categories {
      id
      title
    }
  }
}

fragment CurationAudienceNextButtonFragment on AudienceCurationProfile {
  audiences {
    id
  }
}

fragment CurationCategoryNextButtonFragment on CategoryCurationProfile {
  categories {
    id
  }
}

fragment CurationDateOfBirthNextButtonFragment on DateOfBirthCurationProfile {
  dateOfBirth
}

fragment CurationStepperFooterFragment on CurationProfile {
  dateOfBirth {
    ...CurationDateOfBirthNextButtonFragment
  }
  audience {
    ...CurationAudienceNextButtonFragment
  }
  category {
    ...CurationCategoryNextButtonFragment
  }
}

fragment DateOfBirthCurationStepFragment on CurationProfile {
  dateOfBirth {
    dateOfBirth
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "completed",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  (v1/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "title",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CurationProfileSetupQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "CurationProfile",
            "kind": "LinkedField",
            "name": "curationProfile",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "DateOfBirthCurationStepFragment"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "AudiencesCurationStepFragment"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "CategoriesCurationStepFragment"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "CurationStepperFooterFragment"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CurationProfileSetupQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "CurationProfile",
            "kind": "LinkedField",
            "name": "curationProfile",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "DateOfBirthCurationProfile",
                "kind": "LinkedField",
                "name": "dateOfBirth",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "dateOfBirth",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "AudienceCurationProfile",
                "kind": "LinkedField",
                "name": "audience",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Audience",
                    "kind": "LinkedField",
                    "name": "audiences",
                    "plural": true,
                    "selections": (v2/*: any*/),
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "CategoryCurationProfile",
                "kind": "LinkedField",
                "name": "category",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Category",
                    "kind": "LinkedField",
                    "name": "categories",
                    "plural": true,
                    "selections": (v2/*: any*/),
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "f5f6fbb4de171a235ace1b54222505ca",
    "metadata": {},
    "name": "CurationProfileSetupQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = 'e9ddcc866716e5fcb75541e896091d9a';
export default node;
