/**
 * @generated SignedSource<<99acd166ba888e8652796dd4343b4bc1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubPageButtonFragment$data = {
  readonly slug: string;
  readonly " $fragmentType": "ClubPageButtonFragment";
};
export type ClubPageButtonFragment$key = {
  readonly " $data"?: ClubPageButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubPageButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubPageButtonFragment",
  "selections": [
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

(node as any).hash = "b546251e5d8f5da645beabf186e7d6bc";

export default node;
