/**
 * @generated SignedSource<<89a6e70588f25da1c6eae6ac55f3c685>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DraggableContentFragment$data = {
  readonly isSupporterOnly: boolean;
  readonly resource: {
    readonly id: string;
  };
  readonly " $fragmentSpreads": FragmentRefs<"ResourceInfoFragment">;
  readonly " $fragmentType": "DraggableContentFragment";
};
export type DraggableContentFragment = DraggableContentFragment$data;
export type DraggableContentFragment$key = {
  readonly " $data"?: DraggableContentFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DraggableContentFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DraggableContentFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isSupporterOnly",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ResourceInfoFragment"
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
          "name": "id",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};

(node as any).hash = "aa8f009a7988a10001dcaea8364fe14a";

export default node;
