/**
 * @generated SignedSource<<5a5dc43f233df740aac6c3af044211f0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeClubNameFragment$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "ChangeClubNameFragment";
};
export type ChangeClubNameFragment = ChangeClubNameFragment$data;
export type ChangeClubNameFragment$key = {
  readonly " $data"?: ChangeClubNameFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeClubNameFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeClubNameFragment",
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
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "22ce3582ceda61667ec32a526546429f";

export default node;
