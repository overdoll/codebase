/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash e08028b11af47533bec708a9c5086db4 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewPostQueryVariables = {
    reference: string;
};
export type ViewPostQueryResponse = {
    readonly post: {
        readonly " $fragmentRefs": FragmentRefs<"PostBrandFragment" | "PostGalleryContentFragment" | "PostClickableCategoriesFragment" | "PostClickableCharactersFragment">;
    } | null;
};
export type ViewPostQuery = {
    readonly response: ViewPostQueryResponse;
    readonly variables: ViewPostQueryVariables;
};



/*
query ViewPostQuery(
  $reference: String!
) {
  post(reference: $reference) {
    ...PostBrandFragment
    ...PostGalleryContentFragment
    ...PostClickableCategoriesFragment
    ...PostClickableCharactersFragment
    id
  }
}

fragment ImageSnippetFragment on Resource {
  urls {
    url
    mimeType
  }
}

fragment PostBrandFragment on Post {
  brand {
    name
    thumbnail {
      ...ResourceIconFragment
    }
    id
  }
}

fragment PostClickableCategoriesFragment on Post {
  categories {
    title
    thumbnail {
      ...ResourceIconFragment
    }
    id
  }
}

fragment PostClickableCharactersFragment on Post {
  characters {
    name
    series {
      title
      id
    }
    thumbnail {
      ...ResourceIconFragment
    }
    id
  }
}

fragment PostGalleryContentFragment on Post {
  content {
    type
    ...ImageSnippetFragment
    ...VideoSnippetFragment
  }
}

fragment ResourceIconFragment on Resource {
  ...ResourceItemFragment
}

fragment ResourceItemFragment on Resource {
  type
  ...ImageSnippetFragment
  ...VideoSnippetFragment
}

fragment VideoSnippetFragment on Resource {
  urls {
    url
    mimeType
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "reference"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "reference",
    "variableName": "reference"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "type",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "ResourceUrl",
    "kind": "LinkedField",
    "name": "urls",
    "plural": true,
    "selections": [
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
        "name": "mimeType",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
],
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "Resource",
  "kind": "LinkedField",
  "name": "thumbnail",
  "plural": false,
  "selections": (v3/*: any*/),
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ViewPostQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "post",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PostBrandFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PostGalleryContentFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PostClickableCategoriesFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PostClickableCharactersFragment"
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
    "name": "ViewPostQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "post",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Brand",
            "kind": "LinkedField",
            "name": "brand",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Resource",
            "kind": "LinkedField",
            "name": "content",
            "plural": true,
            "selections": (v3/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Category",
            "kind": "LinkedField",
            "name": "categories",
            "plural": true,
            "selections": [
              (v6/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Character",
            "kind": "LinkedField",
            "name": "characters",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Series",
                "kind": "LinkedField",
                "name": "series",
                "plural": false,
                "selections": [
                  (v6/*: any*/),
                  (v5/*: any*/)
                ],
                "storageKey": null
              },
              (v4/*: any*/),
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "e08028b11af47533bec708a9c5086db4",
    "metadata": {},
    "name": "ViewPostQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = 'f6980c5ea3a2b0d17df52a524efdddbf';
export default node;
