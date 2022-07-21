/**
 * @generated SignedSource<<e946434f46f51c0f86e8db2dfe584330>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubLeaveWrapperClubFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "ClubLeaveWrapperClubFragment";
};
export type ClubLeaveWrapperClubFragment$key = {
  readonly " $data"?: ClubLeaveWrapperClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubLeaveWrapperClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubLeaveWrapperClubFragment",
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

(node as any).hash = "62dd2fa7af31d1ba231788e1414ae03f";

export default node;
