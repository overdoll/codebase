/**
 * @generated SignedSource<<60f1132c15a8aea99ed4347f302072c3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubCopyLinkButtonFragment$data = {
  readonly slug: string;
  readonly " $fragmentType": "ClubCopyLinkButtonFragment";
};
export type ClubCopyLinkButtonFragment = ClubCopyLinkButtonFragment$data;
export type ClubCopyLinkButtonFragment$key = {
  readonly " $data"?: ClubCopyLinkButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubCopyLinkButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubCopyLinkButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "131614001da3754f90dab356aa4656d8";

export default node;
