/**
 * @generated SignedSource<<65f01bf782267438f84f6926a9cc1a90>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeClubThumbnailFragment$data = {
  readonly thumbnail: {
    readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeClubThumbnailFormFragment">;
  readonly " $fragmentType": "ChangeClubThumbnailFragment";
};
export type ChangeClubThumbnailFragment = ChangeClubThumbnailFragment$data;
export type ChangeClubThumbnailFragment$key = {
  readonly " $data"?: ChangeClubThumbnailFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeClubThumbnailFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeClubThumbnailFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "thumbnail",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ResourceIconFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChangeClubThumbnailFormFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "6b80c8916ee6ed86c4dcbf967b82ea8d";

export default node;
