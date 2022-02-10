/**
 * @generated SignedSource<<215459edb8ece2675563b02c0b2a152b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CurationDateOfBirthNextButtonFragment$data = {
  readonly dateOfBirth: any | null;
  readonly " $fragmentType": "CurationDateOfBirthNextButtonFragment";
};
export type CurationDateOfBirthNextButtonFragment = CurationDateOfBirthNextButtonFragment$data;
export type CurationDateOfBirthNextButtonFragment$key = {
  readonly " $data"?: CurationDateOfBirthNextButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CurationDateOfBirthNextButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CurationDateOfBirthNextButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "dateOfBirth",
      "storageKey": null
    }
  ],
  "type": "DateOfBirthCurationProfile",
  "abstractKey": null
};

(node as any).hash = "6c414651fdc1697117a032809b3970c5";

export default node;
