/**
 * @generated SignedSource<<b69b4d56164a43d5568636ad7c434fca>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeClubThumbnailFormFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "ChangeClubThumbnailFormFragment";
};
export type ChangeClubThumbnailFormFragment$key = {
  readonly " $data"?: ChangeClubThumbnailFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeClubThumbnailFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeClubThumbnailFormFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "b5224f2caef7756921c8397299f726f1";

export default node;
