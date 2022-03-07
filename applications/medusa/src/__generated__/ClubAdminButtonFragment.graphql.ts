/**
 * @generated SignedSource<<51979ac95cdaa59ae8c962dd3e02df3f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubAdminButtonFragment$data = {
  readonly slug: string;
  readonly " $fragmentType": "ClubAdminButtonFragment";
};
export type ClubAdminButtonFragment = ClubAdminButtonFragment$data;
export type ClubAdminButtonFragment$key = {
  readonly " $data"?: ClubAdminButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubAdminButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubAdminButtonFragment",
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

(node as any).hash = "af62ac5f8d43a998830bc6c8597980de";

export default node;
