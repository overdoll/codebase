/**
 * @generated SignedSource<<fd5dad6284e571c918deb3e417685cd5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProcessContentDisplayFragment$data = {
  readonly content: ReadonlyArray<{
    readonly id: string;
    readonly media: {
      readonly __typename: "RawMedia";
      readonly progress: {
        readonly progress: number;
      } | null;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    };
    readonly " $fragmentSpreads": FragmentRefs<"ExpandableResourceInfoFragment">;
  }>;
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"isFailedFragment" | "isProcessedFragment">;
  readonly " $fragmentType": "ProcessContentDisplayFragment";
};
export type ProcessContentDisplayFragment$key = {
  readonly " $data"?: ProcessContentDisplayFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProcessContentDisplayFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProcessContentDisplayFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "PostContent",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "media",
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
              "kind": "InlineFragment",
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "MediaProgress",
                  "kind": "LinkedField",
                  "name": "progress",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "progress",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "type": "RawMedia",
              "abstractKey": null
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ExpandableResourceInfoFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "isFailedFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "isProcessedFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();

(node as any).hash = "110ce141928ba33a0077f5ad8ce7534e";

export default node;
