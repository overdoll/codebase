/**
 * @generated SignedSource<<3dfb8335337d89c92bc96b6c7bec8900>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WithdrawMembershipButtonClubFragment$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "WithdrawMembershipButtonClubFragment";
};
export type WithdrawMembershipButtonClubFragment = WithdrawMembershipButtonClubFragment$data;
export type WithdrawMembershipButtonClubFragment$key = {
  readonly " $data"?: WithdrawMembershipButtonClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"WithdrawMembershipButtonClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WithdrawMembershipButtonClubFragment",
  "selections": [
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
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "0643a62f7ca12813b3fbda1aeb276e79";

export default node;
