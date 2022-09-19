/**
 * @generated SignedSource<<0d924077bd0aa2898b398fa597b79d66>>
 * @relayHash e91c7965af72dfab3d4a6b7ba9271f73
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID e91c7965af72dfab3d4a6b7ba9271f73

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateClubThumbnailInput = {
  id: string;
  thumbnail: string;
};
export type ChangeClubThumbnailUploadMutation$variables = {
  input: UpdateClubThumbnailInput;
};
export type ChangeClubThumbnailUploadMutation$data = {
  readonly updateClubThumbnail: {
    readonly club: {
      readonly id: string;
      readonly name: string;
      readonly " $fragmentSpreads": FragmentRefs<"ClubIconFragment">;
    } | null;
  } | null;
};
export type ChangeClubThumbnailUploadMutation = {
  response: ChangeClubThumbnailUploadMutation$data;
  variables: ChangeClubThumbnailUploadMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "url",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "width",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "height",
    "storageKey": null
  }
],
v5 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ColorPalette",
    "kind": "LinkedField",
    "name": "colorPalettes",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "red",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "green",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "blue",
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "ImageMediaVariants",
    "kind": "LinkedField",
    "name": "variants",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ImageMediaAccess",
        "kind": "LinkedField",
        "name": "icon",
        "plural": false,
        "selections": (v4/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "ImageMediaAccess",
        "kind": "LinkedField",
        "name": "mini",
        "plural": false,
        "selections": (v4/*: any*/),
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  (v2/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChangeClubThumbnailUploadMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateClubThumbnailPayload",
        "kind": "LinkedField",
        "name": "updateClubThumbnail",
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
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ClubIconFragment"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangeClubThumbnailUploadMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateClubThumbnailPayload",
        "kind": "LinkedField",
        "name": "updateClubThumbnail",
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
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "thumbnailMedia",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  },
                  {
                    "kind": "TypeDiscriminator",
                    "abstractKey": "__isMedia"
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v5/*: any*/),
                    "type": "ImageMedia",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ImageMedia",
                        "kind": "LinkedField",
                        "name": "cover",
                        "plural": false,
                        "selections": (v5/*: any*/),
                        "storageKey": null
                      },
                      (v2/*: any*/)
                    ],
                    "type": "VideoMedia",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v2/*: any*/)
                    ],
                    "type": "RawMedia",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "e91c7965af72dfab3d4a6b7ba9271f73",
    "metadata": {},
    "name": "ChangeClubThumbnailUploadMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "0100dbb2d7bc68a11f7345e6d8de8def";

export default node;
