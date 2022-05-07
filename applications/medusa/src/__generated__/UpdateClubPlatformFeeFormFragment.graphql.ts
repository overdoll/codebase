/**
 * @generated SignedSource<<bf83891011efe78e00d8a413acf78330>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateClubPlatformFeeFormFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "UpdateClubPlatformFeeFormFragment";
};
export type UpdateClubPlatformFeeFormFragment = UpdateClubPlatformFeeFormFragment$data;
export type UpdateClubPlatformFeeFormFragment$key = {
  readonly " $data"?: UpdateClubPlatformFeeFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UpdateClubPlatformFeeFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UpdateClubPlatformFeeFormFragment",
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

(node as any).hash = "252a3e8b553f341b7af1d2b47519f2c0";

export default node;
