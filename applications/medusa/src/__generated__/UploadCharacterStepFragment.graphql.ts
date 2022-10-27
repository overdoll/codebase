/**
 * @generated SignedSource<<e75d8c318ca0ddb34fa4c78201bb6838>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UploadCharacterStepFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"UploadSearchClubCharactersFragment">;
  readonly " $fragmentType": "UploadCharacterStepFragment";
};
export type UploadCharacterStepFragment$key = {
  readonly " $data"?: UploadCharacterStepFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UploadCharacterStepFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UploadCharacterStepFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UploadSearchClubCharactersFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "4cd3db975b2d4e2e1de3c067467f1542";

export default node;
