/**
 * @generated SignedSource<<dfac74f1f1c76fa93071d50680b44526>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArrangeLastPostContentButtonFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "ArrangeLastPostContentButtonFragment";
};
export type ArrangeLastPostContentButtonFragment$key = {
  readonly " $data"?: ArrangeLastPostContentButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArrangeLastPostContentButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArrangeLastPostContentButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};

(node as any).hash = "b7393dda71fa8c8c0b2adf13e14fe7f0";

export default node;
