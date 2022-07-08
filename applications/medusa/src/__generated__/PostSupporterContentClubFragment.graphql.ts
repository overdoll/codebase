/**
 * @generated SignedSource<<cd0531db17758883dbbba38d36607437>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostSupporterContentClubFragment$data = {
  readonly slug: string;
  readonly " $fragmentType": "PostSupporterContentClubFragment";
};
export type PostSupporterContentClubFragment$key = {
  readonly " $data"?: PostSupporterContentClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostSupporterContentClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostSupporterContentClubFragment",
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

(node as any).hash = "bed1ef669fb63b034c9fb9ce5a6ce929";

export default node;
