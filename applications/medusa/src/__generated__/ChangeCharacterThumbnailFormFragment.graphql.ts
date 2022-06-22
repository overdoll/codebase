/**
 * @generated SignedSource<<d1db5220418e7cf99d32800776fcdc73>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeCharacterThumbnailFormFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "ChangeCharacterThumbnailFormFragment";
};
export type ChangeCharacterThumbnailFormFragment$key = {
  readonly " $data"?: ChangeCharacterThumbnailFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeCharacterThumbnailFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeCharacterThumbnailFormFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Character",
  "abstractKey": null
};

(node as any).hash = "704351eedcf59f2052284abb91738d2c";

export default node;
