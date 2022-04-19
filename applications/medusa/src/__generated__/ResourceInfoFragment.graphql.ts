/**
 * @generated SignedSource<<15b1c902e8ebfb901123fcbd82221f3c>>
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

(node as any).hash = "0aa2641408d2603069beff05c615939a";

export default node;
