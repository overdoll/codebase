/**
 * @generated SignedSource<<7677bf868e8ab4eb91c2657cd9e64667>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ResourceProgressState = "FINALIZING" | "STARTED" | "WAITING" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PostContentPreviewMemoFragment$data = {
  readonly resource: {
    readonly failed: boolean;
    readonly processed: boolean;
    readonly progress: {
      readonly progress: number;
      readonly state: ResourceProgressState;
    } | null;
  };
  readonly " $fragmentSpreads": FragmentRefs<"PostContentPreviewFragment">;
  readonly " $fragmentType": "PostContentPreviewMemoFragment";
};
export type PostContentPreviewMemoFragment$key = {
  readonly " $data"?: PostContentPreviewMemoFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostContentPreviewMemoFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostContentPreviewMemoFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "resource",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "processed",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "ResourceProgress",
          "kind": "LinkedField",
          "name": "progress",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "state",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "progress",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "failed",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostContentPreviewFragment"
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};

(node as any).hash = "dab17ce2c5795343551e8939ef8543d2";

export default node;
