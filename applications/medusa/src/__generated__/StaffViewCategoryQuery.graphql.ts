/**
 * @generated SignedSource<<4ae119df1bb20dc7f3a3ce9309fa7aff>>
 * @relayHash b10d2c6cd31e3c1d505999c267718c2d
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID b10d2c6cd31e3c1d505999c267718c2d

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffViewCategoryQuery$variables = {
  slug: string;
};
export type StaffViewCategoryQuery$data = {
  readonly category: {
    readonly " $fragmentSpreads": FragmentRefs<"ChangeCategoryThumbnailFragment" | "ChangeCategoryTitleFragment">;
  } | null;
};
export type StaffViewCategoryQuery = {
  response: StaffViewCategoryQuery$data;
  variables: StaffViewCategoryQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "slug",
    "variableName": "slug"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "url",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "StaffViewCategoryQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Category",
        "kind": "LinkedField",
        "name": "category",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ChangeCategoryTitleFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ChangeCategoryThumbnailFragment"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StaffViewCategoryQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Category",
        "kind": "LinkedField",
        "name": "category",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Translation",
            "kind": "LinkedField",
            "name": "titleTranslations",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "text",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Language",
                "kind": "LinkedField",
                "name": "language",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "locale",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Resource",
            "kind": "LinkedField",
            "name": "thumbnail",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ResourceUrl",
                "kind": "LinkedField",
                "name": "urls",
                "plural": true,
                "selections": (v3/*: any*/),
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
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "preview",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ResourceUrl",
                "kind": "LinkedField",
                "name": "videoThumbnail",
                "plural": false,
                "selections": (v3/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "type",
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
    "id": "b10d2c6cd31e3c1d505999c267718c2d",
    "metadata": {},
    "name": "StaffViewCategoryQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "191a5529288888ce5137bdfac2002957";

import { PreloadableQueryRegistry } from 'relay-runtime';
PreloadableQueryRegistry.set(node.params.id, node);

export default node;
