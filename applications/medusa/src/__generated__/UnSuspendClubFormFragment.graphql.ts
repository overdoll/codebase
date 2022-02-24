/**
 * @generated SignedSource<<d7631030fc0dbd3f13631aa100bfb709>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UnSuspendClubFormFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "UnSuspendClubFormFragment";
};
export type UnSuspendClubFormFragment = UnSuspendClubFormFragment$data;
export type UnSuspendClubFormFragment$key = {
  readonly " $data"?: UnSuspendClubFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UnSuspendClubFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UnSuspendClubFormFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "b78cda0949ca09d40de93f5b97c5a5b7";

export default node;
