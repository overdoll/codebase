/**
 * @generated SignedSource<<bd71e00b2b4a72df28201bc05e882d28>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArrangeDownPostContentButtonFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "ArrangeDownPostContentButtonFragment";
};
export type ArrangeDownPostContentButtonFragment$key = {
  readonly " $data"?: ArrangeDownPostContentButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArrangeDownPostContentButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArrangeDownPostContentButtonFragment",
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

(node as any).hash = "43813922209391a5f693dd15c20bebdb";

export default node;
