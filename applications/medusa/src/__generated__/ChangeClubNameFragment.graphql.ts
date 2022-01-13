/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ChangeClubNameFragment = {
    readonly id: string;
    readonly name: string;
    readonly " $refType": "ChangeClubNameFragment";
};
export type ChangeClubNameFragment$data = ChangeClubNameFragment;
export type ChangeClubNameFragment$key = {
    readonly " $data"?: ChangeClubNameFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ChangeClubNameFragment">;
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
(node as any).hash = '22ce3582ceda61667ec32a526546429f';
export default node;
