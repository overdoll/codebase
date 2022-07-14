/**
 * @generated SignedSource<<c43b8326ff262b34c3905264fb39c57e>>
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
  readonly " $fragmentSpreads": FragmentRefs<"PostContentPreviewMenuFragment" | "RemovePostContentButtonFragment" | "ResourceInfoFragment" | "SupporterPostContentButtonFragment">;
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
      "name": "ResourceInfoFragment"
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
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};

(node as any).hash = "6ba1000bd74a11434358e88e27742e1d";

export default node;
