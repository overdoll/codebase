/**
 * @generated SignedSource<<d9fb8396442aee5d67eeb3cd25467558>>
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
