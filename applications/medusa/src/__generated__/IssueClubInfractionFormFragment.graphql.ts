/**
 * @generated SignedSource<<52a2a0fbe41b00e4580ef51c22722270>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type IssueClubInfractionFormFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "IssueClubInfractionFormFragment";
};
export type IssueClubInfractionFormFragment$key = {
  readonly " $data"?: IssueClubInfractionFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"IssueClubInfractionFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "IssueClubInfractionFormFragment",
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

(node as any).hash = "8c5a5996d65b8866b3017fe236959d64";

export default node;
