/**
 * @generated SignedSource<<49deee261d807811bc26d8564a575767>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreateClubCharacterFormFragment$data = {
  readonly charactersCount: number;
  readonly charactersLimit: number;
  readonly id: string;
  readonly slug: string;
  readonly " $fragmentType": "CreateClubCharacterFormFragment";
};
export type CreateClubCharacterFormFragment$key = {
  readonly " $data"?: CreateClubCharacterFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CreateClubCharacterFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CreateClubCharacterFormFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
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
      "name": "charactersLimit",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "charactersCount",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "a6c5a7b4c8d30ca47edaf88f7fa94aaf";

export default node;
