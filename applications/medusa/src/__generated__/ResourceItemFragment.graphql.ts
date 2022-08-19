/**
 * @generated SignedSource<<35c972df317b57ccf468cc506595dc40>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ResourceProgressState = "FINALIZING" | "STARTED" | "WAITING" | "%future added value";
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ResourceItemFragment$data = {
  readonly failed: boolean;
  readonly preview: string;
  readonly processed: boolean;
  readonly progress: {
    readonly id: string;
    readonly progress: number;
    readonly state: ResourceProgressState;
  } | null;
  readonly type: ResourceType;
  readonly " $fragmentSpreads": FragmentRefs<"ImageSnippetFragment" | "VideoSnippetFragment">;
  readonly " $fragmentType": "ResourceItemFragment";
};
export type ResourceItemFragment$key = {
  readonly " $data"?: ResourceItemFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ResourceItemFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ResourceItemFragment",
  "selections": [
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
      "kind": "ScalarField",
      "name": "processed",
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
      "kind": "ScalarField",
      "name": "failed",
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
          "name": "id",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "progress",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "state",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ImageSnippetFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "VideoSnippetFragment"
    }
  ],
  "type": "Resource",
  "abstractKey": null
};

(node as any).hash = "da34a76e7e6cf1b46e6fc818f7de368e";

export default node;
