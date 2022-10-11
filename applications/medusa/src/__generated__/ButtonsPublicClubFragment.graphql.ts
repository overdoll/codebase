/**
 * @generated SignedSource<<673c74f2988219ecdc676db1163c916d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ButtonsPublicClubFragment$data = {
  readonly name: string;
  readonly slug: string;
  readonly " $fragmentType": "ButtonsPublicClubFragment";
};
export type ButtonsPublicClubFragment$key = {
  readonly " $data"?: ButtonsPublicClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ButtonsPublicClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ButtonsPublicClubFragment",
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
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "f15f60415aa9fb961c93854d659fc3bf";

export default node;
