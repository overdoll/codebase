/**
 * @generated SignedSource<<016961bd0d058d30249de3259cc20e26>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type isFailedFragment$data = {
  readonly content: ReadonlyArray<{
    readonly media: {
      readonly __typename: "RawMedia";
      readonly failed: boolean;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    };
  }>;
  readonly " $fragmentType": "isFailedFragment";
};
export type isFailedFragment$key = {
  readonly " $data"?: isFailedFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"isFailedFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "isFailedFragment",
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
                  "kind": "ScalarField",
                  "name": "failed",
                  "storageKey": null
                }
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
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "9a42e2d8cbedee0f1a9f5b32baa860c7";

export default node;
