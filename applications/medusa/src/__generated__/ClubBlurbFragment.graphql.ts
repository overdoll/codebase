/**
 * @generated SignedSource<<94c4ac966961e5a894e6099b158f6f1b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubBlurbFragment$data = {
  readonly blurb: string;
  readonly name: string;
  readonly " $fragmentType": "ClubBlurbFragment";
};
export type ClubBlurbFragment$key = {
  readonly " $data"?: ClubBlurbFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubBlurbFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubBlurbFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "blurb",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "a8b0b6b971c779c964ccc9ed91a710a8";

export default node;
