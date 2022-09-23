/**
 * @generated SignedSource<<ee0232c0e1e5d0246e0137fa3935160f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RemovePostContentButtonFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "RemovePostContentButtonFragment";
};
export type RemovePostContentButtonFragment$key = {
  readonly " $data"?: RemovePostContentButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RemovePostContentButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RemovePostContentButtonFragment",
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

(node as any).hash = "ada42135d1cfa16559bc1523c06b9f29";

export default node;
