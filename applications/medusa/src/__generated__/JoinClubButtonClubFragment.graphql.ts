/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type JoinClubButtonClubFragment = {
    readonly id: string;
    readonly name: string;
    readonly viewerMember: {
        readonly __typename: string;
    } | null;
    readonly " $refType": "JoinClubButtonClubFragment";
};
export type JoinClubButtonClubFragment$data = JoinClubButtonClubFragment;
export type JoinClubButtonClubFragment$key = {
    readonly " $data"?: JoinClubButtonClubFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"JoinClubButtonClubFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JoinClubButtonClubFragment",
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ClubMember",
      "kind": "LinkedField",
      "name": "viewerMember",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};
(node as any).hash = 'fdd4a6dac5b1a55090f79d507d1bb297';
export default node;
