/**
 * @generated SignedSource<<d7d35896bc7602350fd3c7420f5aa752>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostContentPreviewFragment$data = {
  readonly id: string;
  readonly isSupporterOnly: boolean;
  readonly resource: {
    readonly failed: boolean;
  };
  readonly " $fragmentSpreads": FragmentRefs<"ExpandableResourceInfoFragment" | "PostContentPreviewMenuFragment" | "RemovePostContentButtonFragment" | "SupporterPostContentButtonFragment">;
  readonly " $fragmentType": "PostContentPreviewFragment";
};
export type PostContentPreviewFragment$key = {
  readonly " $data"?: PostContentPreviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostContentPreviewFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostContentPreviewFragment",
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
          "name": "failed",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostContentPreviewMenuFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RemovePostContentButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SupporterPostContentButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ExpandableResourceInfoFragment"
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};

(node as any).hash = "162611b593812c2e4dd3e426757990ce";

export default node;
