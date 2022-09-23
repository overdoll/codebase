/**
 * @generated SignedSource<<8ed036241116b813a99b09b9ce5e475e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type isProcessedFragment$data = {
  readonly content: ReadonlyArray<{
    readonly media: {
      readonly __typename: string;
    };
  }>;
  readonly " $fragmentType": "isProcessedFragment";
};
export type isProcessedFragment$key = {
  readonly " $data"?: isProcessedFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"isProcessedFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "isProcessedFragment",
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

(node as any).hash = "5607ff07d82b67332903fe3a040c3635";

export default node;
