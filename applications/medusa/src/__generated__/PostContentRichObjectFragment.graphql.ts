/**
 * @generated SignedSource<<f8f6f2b73027cf4aa6a5db167a3909d0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostContentRichObjectFragment$data = {
  readonly content: ReadonlyArray<{
    readonly media: {
      readonly __typename: "ImageMedia";
      readonly variants: {
        readonly small: {
          readonly height: number;
          readonly url: string;
          readonly width: number;
        };
      };
    } | {
      readonly __typename: "VideoMedia";
      readonly containers: ReadonlyArray<{
        readonly __typename: "MP4VideoContainer";
        readonly __typename: "MP4VideoContainer";
        readonly url: string;
      } | {
        // This will never be '%other', but we need some
        // value in case none of the concrete values match.
        readonly __typename: "%other";
      }>;
      readonly cover: {
        readonly variants: {
          readonly small: {
            readonly url: string;
          };
        };
      };
      readonly duration: number;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    };
  }>;
  readonly " $fragmentType": "PostContentRichObjectFragment";
};
export type PostContentRichObjectFragment$key = {
  readonly " $data"?: PostContentRichObjectFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostContentRichObjectFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v2 = [
  (v1/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostContentRichObjectFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "PostContent",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "media",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            {
              "kind": "InlineFragment",
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": null,
                  "kind": "LinkedField",
                  "name": "containers",
                  "plural": true,
                  "selections": [
                    (v0/*: any*/),
                    {
                      "kind": "InlineFragment",
                      "selections": (v2/*: any*/),
                      "type": "MP4VideoContainer",
                      "abstractKey": null
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "duration",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "ImageMedia",
                  "kind": "LinkedField",
                  "name": "cover",
                  "plural": false,
                  "selections": [
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
                          "name": "small",
                          "plural": false,
                          "selections": (v2/*: any*/),
                          "storageKey": null
                        }
                      ],
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "type": "VideoMedia",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": [
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
                      "name": "small",
                      "plural": false,
                      "selections": [
                        (v1/*: any*/),
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
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "type": "ImageMedia",
              "abstractKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();

(node as any).hash = "a0fd83ab94f48e538c6fc32270b6a08f";

export default node;
