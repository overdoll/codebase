/**
 * @generated SignedSource<<cf9cd93b099ed95850a62d3874e7f145>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeClubHeaderUploadFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "ChangeClubHeaderUploadFragment";
};
export type ChangeClubHeaderUploadFragment$key = {
  readonly " $data"?: ChangeClubHeaderUploadFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeClubHeaderUploadFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeClubHeaderUploadFragment",
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

(node as any).hash = "faac1972a2eab32c38db28eefc4c521c";

export default node;
