/**
 * @generated SignedSource<<b0a67b36e025ba5c469866e033a58b14>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArrangeFirstPostContentButtonFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "ArrangeFirstPostContentButtonFragment";
};
export type ArrangeFirstPostContentButtonFragment$key = {
  readonly " $data"?: ArrangeFirstPostContentButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArrangeFirstPostContentButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArrangeFirstPostContentButtonFragment",
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

(node as any).hash = "f2a4ebae2f61cccb72e88dc7121ecc56";

export default node;
