/**
 * @generated SignedSource<<a82f158d1c29ecd13e7471a611f7df36>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ResourceInfoFragment$data = {
  readonly id: string;
  readonly isSupporterOnly: boolean;
  readonly resource: {
    readonly type: ResourceType;
    readonly processed: boolean;
    readonly videoDuration: number;
    readonly " $fragmentSpreads": FragmentRefs<"ResourceItemFragment">;
  };
  readonly " $fragmentType": "ResourceInfoFragment";
};
export type ResourceInfoFragment = ResourceInfoFragment$data;
export type ResourceInfoFragment$key = {
  readonly " $data"?: ResourceInfoFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ResourceInfoFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ResourceInfoFragment",
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
      "name": "isSupporterOnly",
      "storageKey": null
    },
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
          "name": "videoDuration",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ResourceItemFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};

(node as any).hash = "2cfb8ac45f069a4df4fd88e1f94fa276";

export default node;
