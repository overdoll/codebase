/**
 * @generated SignedSource<<596f14655d500ea97198ac8d234bc838>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SupporterPostContentButtonFragment$data = {
  readonly id: string;
  readonly isSupporterOnly: boolean;
  readonly " $fragmentType": "SupporterPostContentButtonFragment";
};
export type SupporterPostContentButtonFragment$key = {
  readonly " $data"?: SupporterPostContentButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SupporterPostContentButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SupporterPostContentButtonFragment",
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
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};

(node as any).hash = "3ce21c845baff448519bf43fce889ec8";

export default node;
