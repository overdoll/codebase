/**
 * @generated SignedSource<<a4dd636df6fc2cc00eed2ca8dc371f29>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ResourceProgressState = "FINALIZING" | "STARTED" | "WAITING" | "%future added value";
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
  readonly " $fragmentSpreads": FragmentRefs<"ResourceItemMediaFragment">;
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
      "name": "ResourceItemMediaFragment"
    }
  ],
  "type": "Resource",
  "abstractKey": null
};

(node as any).hash = "7adf9dfb5d8955905029a4326358f9af";

export default node;
