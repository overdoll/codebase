/**
 * @generated SignedSource<<21c572ead96f98a3a6277c36359d6597>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SuspendClubFormFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "SuspendClubFormFragment";
};
export type SuspendClubFormFragment$key = {
  readonly " $data"?: SuspendClubFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SuspendClubFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SuspendClubFormFragment",
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

(node as any).hash = "8ce420de829fd243927e7af2f60a915d";

export default node;
