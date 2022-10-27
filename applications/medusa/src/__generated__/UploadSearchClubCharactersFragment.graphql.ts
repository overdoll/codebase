/**
 * @generated SignedSource<<a0a3995e257aae5354eebb9d39debd63>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UploadSearchClubCharactersFragment$data = {
  readonly club: {
    readonly slug: string;
  };
  readonly " $fragmentType": "UploadSearchClubCharactersFragment";
};
export type UploadSearchClubCharactersFragment$key = {
  readonly " $data"?: UploadSearchClubCharactersFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UploadSearchClubCharactersFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UploadSearchClubCharactersFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "club",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "f6d0531409207e8a868e60340da9ed56";

export default node;
