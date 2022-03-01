/**
 * @generated SignedSource<<c39d859bd7700777df14b12bff27c13b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeClubNameFragment$data = {
  readonly name: string;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeClubNameFormFragment">;
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
      "name": "name",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChangeClubNameFormFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "f88af374150a1adc1dd415f37005f6ea";

export default node;
