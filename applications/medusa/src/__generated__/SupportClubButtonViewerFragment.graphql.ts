/**
 * @generated SignedSource<<c394aa44867c6f89cbb451606945dc47>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SupportClubButtonViewerFragment$data = {
  readonly __typename: "Account";
  readonly " $fragmentSpreads": FragmentRefs<"SupportSelectMethodViewerFragment">;
  readonly " $fragmentType": "SupportClubButtonViewerFragment";
};
export type SupportClubButtonViewerFragment = SupportClubButtonViewerFragment$data;
export type SupportClubButtonViewerFragment$key = {
  readonly " $data"?: SupportClubButtonViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SupportClubButtonViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SupportClubButtonViewerFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SupportSelectMethodViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "dd0306487544e4a3ce064d2500cafcff";

export default node;
